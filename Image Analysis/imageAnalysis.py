import torch
from transformers import ViTForImageClassification, ViTImageProcessor
from PIL import Image


model_name = 'google/vit-base-patch16-224-in21k' 
model = ViTForImageClassification.from_pretrained(model_name)
processor = ViTImageProcessor.from_pretrained(model_name)

def preprocess_image(image_path):

    image = Image.open(image_path).convert('RGB')
    

    inputs = processor(images=image, return_tensors="pt")
    return inputs


def detect_image(image_path):
    inputs = preprocess_image(image_path)
    

    model.eval() 
    with torch.no_grad():
        outputs = model(**inputs)
    

    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=-1).item()

    labels = ["Real", "Fake"]  
    result = labels[predicted_class]
    
    return result

image_path = r"C:\Users\Prayers\OneDrive\Desktop\sampleimage\kejriwal.png"  
result = detect_image(image_path)
print(f"The image is: {result}")