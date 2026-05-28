import zipfile
import os

archive_path = r"C:\Users\Admin\.cache\kagglehub\datasets\vipoooool\new-plant-diseases-dataset\2.archive"
dest_path = r"C:\Users\Admin\Documents\tumbuhan\data\raw"

os.makedirs(dest_path, exist_ok=True)

print("Ekstrak dataset ke data/raw")
with zipfile.ZipFile(archive_path, 'r') as zip_ref:
    zip_ref.extractall(dest_path)

print("Berhasil! Dataset telah diekstrak ke:", dest_path)
