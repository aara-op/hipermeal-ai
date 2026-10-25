"""
HiperMeal — Food Vision-Language Model Generator & Inference CLI
Usage:
    python generate_food_model.py --test
    python generate_food_model.py --image path/to/meal.jpg
    python generate_food_model.py --serve --port 8005
"""

import sys
import os
import argparse
import base64
import json
import httpx
from PIL import Image
import io

# Ensure UTF-8 output on Windows terminals
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

SERVER_URL = os.environ.get("HIPERMEAL_SERVER_URL", "http://127.0.0.1:8005")

def encode_image(image_path: str) -> str:
    """Read local image file or URL and convert to Base64 string"""
    if image_path.startswith("http://") or image_path.startswith("https://"):
        with httpx.Client(timeout=15.0) as client:
            resp = client.get(image_path)
            resp.raise_for_status()
            return base64.b64encode(resp.content).decode("utf-8")
    else:
        if not os.path.exists(image_path):
            print(f"\n[!] Error: File '{image_path}' not found.")
            print("[!] Please provide a valid file path on your computer or an image URL (https://...)\n")
            sys.exit(1)
        with open(image_path, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")

def run_model_inference(b64_image: str):
    """Dispatches meal image to VLM Microservice (NVIDIA NIM + Open Food Facts)"""
    print(f">> Dispatching meal photo to HiperMeal VLM Engine ({SERVER_URL})...")
    with httpx.Client(timeout=60.0) as client:
        resp = client.post(
            f"{SERVER_URL}/api/analyze-plate",
            data={"base64_image": b64_image}
        )
        if resp.status_code != 200:
            print(f"Error {resp.status_code}: {resp.text}")
            return None
        return resp.json()

def print_report(data: dict):
    if not data:
        return
    print("\n" + "=" * 65)
    print(f">> DISH CLASSIFIED: {data.get('dish_title', 'Unknown Plate').upper()}")
    print(f">> CUISINE REGION:  {data.get('cuisine', 'Global')}")
    print(f">> AI DESCRIPTION:  {data.get('summary', '')}")
    print("=" * 65)
    
    print("\n[ DECOMPOSED FOOD INGREDIENTS & PORTION ESTIMATES ]")
    print(f"{'Food Item':<35} | {'Grams':<7} | {'Calories':<9} | {'Macros (P/C/F)'}")
    print("-" * 65)
    for it in data.get("items", []):
        name = it.get("name", "Item")[:34]
        g = f"{it.get('servingGrams', 0)}g"
        cals = f"{it.get('calculated', {}).get('calories', 0)} kcal"
        p = it.get('calculated', {}).get('protein', 0)
        c = it.get('calculated', {}).get('carbs', 0)
        f = it.get('calculated', {}).get('fat', 0)
        macros = f"P:{p}g C:{c}g F:{f}g"
        print(f"{name:<35} | {g:<7} | {cals:<9} | {macros}")

    totals = data.get("totals", {})
    print("-" * 65)
    print(f"{'PLATE TOTALS':<35} | {'':<7} | {totals.get('calories', 0)} kcal | P:{totals.get('protein', 0)}g C:{totals.get('carbs', 0)}g F:{totals.get('fat', 0)}g")
    
    insights = data.get("metabolic_insights", {})
    print("\n[ METABOLIC HEALTH & CLINICAL QUALITY INDICATORS ]")
    print(f"- Overall Nutri-Score:   Grade {insights.get('overall_nutri_score', 'B')}")
    print(f"- Protein Energy Ratio:  {insights.get('protein_ratio', 'N/A')}")
    print(f"- Fiber Adequacy:        {insights.get('fiber_adequacy', 'Moderate')} ({totals.get('fiber', 0)}g)")
    print(f"- Glucose Stability:     {insights.get('blood_sugar_stability', 'Moderate')}")
    print("=" * 65 + "\n")

def main():
    parser = argparse.ArgumentParser(description="HiperMeal Vision-Language Model Generator")
    parser.add_argument("--image", type=str, help="Path or URL to meal image")
    parser.add_argument("--test", action="store_true", help="Run benchmark test on synthetic plate")
    parser.add_argument("--serve", action="store_true", help="Launch FastAPI VLM server")
    parser.add_argument("--port", type=int, default=8005, help="Port to run server on")
    
    args = parser.parse_args()

    if args.serve:
        import uvicorn
        from meal_vlm_server import app
        print(f">> Starting HiperMeal VLM on port {args.port}...")
        uvicorn.run(app, host="0.0.0.0", port=args.port)
        return

    if args.test:
        from test_model_inference import test_inference
        test_inference()
        return

    if args.image:
        b64 = encode_image(args.image)
        result = run_model_inference(b64)
        print_report(result)
        return

    # Default if no arguments: run test
    print(">> No arguments provided. Running test inference...")
    from test_model_inference import test_inference
    test_inference()

if __name__ == "__main__":
    main()
