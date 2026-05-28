import torch
from torchvision import transforms, models
from PIL import Image
import json

# Global variables
_MODEL = None
_CLASS_NAMES = None

def get_model():
    global _MODEL, _CLASS_NAMES
    if _MODEL is None:
        class_names = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___healthy', 'Corn_(maize)___Northern_Leaf_Blight', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___healthy', 'Strawberry___Leaf_scorch', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus']
        
        state_dict = torch.load(
            "../model/plant_model.pth",
            map_location=torch.device("cpu"),
            weights_only=True
        )
        
        model = models.resnet18(weights=None)
        model.fc = torch.nn.Linear(model.fc.in_features, len(class_names))
        model.load_state_dict(state_dict)
        model.eval()
        
        _MODEL = model
        _CLASS_NAMES = class_names
    return _MODEL, _CLASS_NAMES

# Transformasi gambar
def transform_image(image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])
    return transform(image)

# Fungsi prediksi utama
def predict(images):
    model, class_names = get_model()
    
    # Process all images
    tensors = [transform_image(img) for img in images]
    batch_tensor = torch.stack(tensors)  # Shape: (N, 3, 224, 224)
    
    with torch.no_grad():
        outputs = model(batch_tensor)  # Shape: (N, num_classes)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
    
    batch_results = []
    
    for i in range(probabilities.size(0)):
        prob_i = probabilities[i]
        # Ambil top 3 prediksi per gambar
        top3_prob, top3_idx = torch.topk(prob_i, 3)
        
        results = []
        for prob, idx in zip(top3_prob, top3_idx):
            label = class_names[idx]
            parts = label.split("___")
            plant = parts[0].replace("_", " ")
            disease = parts[1].replace("_", " ") if len(parts) > 1 else "Unknown"
            
            results.append({
                "plant": plant,
                "disease": disease,
                "confidence": round(prob.item() * 100, 2),
                "is_healthy": "healthy" in disease.lower()
            })
        
        batch_results.append(results)
    
    return batch_results