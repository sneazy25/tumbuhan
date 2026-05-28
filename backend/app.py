from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
from predict import predict

app = Flask(__name__)
# Memaksa reload server untuk memuat fitur batch inference
CORS(app)  # Supaya web bisa berkomunikasi dengan server ini
# Force reload untuk memastikan predict.py terbaru dimuat

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return jsonify({"status": "Leafity API berjalan!"})

@app.route("/predict", methods=["POST"])
def predict_disease():
    if "files" not in request.files and "file" not in request.files:
        return jsonify({"error": "Tidak ada file yang dikirim"}), 400
    
    files = request.files.getlist("files")
    if not files:
        file = request.files.get("file")
        if file:
            files = [file]
            
    if not files or files[0].filename == "":
        return jsonify({"error": "File kosong"}), 400
    
    images = []
    for file in files:
        if not allowed_file(file.filename):
            return jsonify({"error": f"Format file tidak didukung. Harap unggah gambar (PNG, JPG, JPEG, WEBP)."}), 400
        
        try:
            image = Image.open(io.BytesIO(file.read())).convert("RGB")
            images.append(image)
        except Exception as e:
            if "cannot identify image file" in str(e).lower() or type(e).__name__ == "UnidentifiedImageError":
                return jsonify({"error": f"File {file.filename} tidak dapat dibaca sebagai gambar yang valid."}), 400
            return jsonify({"error": str(e)}), 500

    try:
        # Prediksi
        results = predict(images)
        
        return jsonify({
            "status": "success",
            "predictions": results
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)