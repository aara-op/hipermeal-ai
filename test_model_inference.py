import httpx
import base64
from PIL import Image, ImageDraw
import io
import json

def test_inference():
    print(">> Generating test meal image...")
    img = Image.new('RGB', (256, 256), color=(30, 25, 20))
    draw = ImageDraw.Draw(img)
    # Plate
    draw.ellipse([20, 20, 236, 236], fill=(225, 220, 210), outline=(170, 160, 150), width=4)
    # Golden food item (crepe / samosa)
    draw.polygon([(60, 190), (130, 60), (200, 190)], fill=(210, 145, 50), outline=(150, 90, 20), width=2)
    # Green mint chutney bowl
    draw.ellipse([150, 50, 200, 100], fill=(40, 130, 50), outline=(20, 80, 30), width=2)

    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    b64_data = base64.b64encode(buf.getvalue()).decode('utf-8')

    print(">> Sending to HiperMeal VLM Engine on Port 8005...")
    try:
        with httpx.Client(timeout=45.0) as client:
            resp = client.post('http://127.0.0.1:8005/api/analyze-plate', data={'base64_image': b64_data})
            print(f">> HTTP Status: {resp.status_code}")
            if resp.status_code == 200:
                data = resp.json()
                print("\n================ MODEL DECOMPOSITION OUTPUT ================")
                print(f"Dish Name: {data.get('dish_title')}")
                print(f"Cuisine:   {data.get('cuisine')}")
                print(f"Summary:   {data.get('summary')}\n")
                print("Decomposed Foods & Portions:")
                for item in data.get('items', []):
                    cals = item.get('calculated', {}).get('calories', 0)
                    prot = item.get('calculated', {}).get('protein', 0)
                    carbs = item.get('calculated', {}).get('carbs', 0)
                    fat = item.get('calculated', {}).get('fat', 0)
                    print(f"  • {item['name']}: {item['servingGrams']}g | {cals} kcal | P: {prot}g, C: {carbs}g, F: {fat}g | NutriScore: {item.get('nutriScore')}")
                
                print("\nPlate Totals:")
                print(f"  Calories: {data.get('totals', {}).get('calories')} kcal")
                print(f"  Protein:  {data.get('totals', {}).get('protein')}g")
                print(f"  Carbs:    {data.get('totals', {}).get('carbs')}g")
                print(f"  Fat:      {data.get('totals', {}).get('fat')}g")
                print(f"  Fiber:    {data.get('totals', {}).get('fiber')}g")

                print("\nMetabolic Quality Insights:")
                insights = data.get('metabolic_insights', {})
                for k, v in insights.items():
                    print(f"  {k}: {v}")
                print("============================================================\n")
            else:
                print(f"Error from server: {resp.text}")
    except Exception as e:
        print(f"Inference execution failed: {e}")

if __name__ == "__main__":
    test_inference()
