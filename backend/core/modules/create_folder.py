import os
from datetime import datetime

def create_folder(video_path, processed_path):
    os.makedirs(processed_path, exist_ok=True)

    base_name = os.path.basename(video_path)
    name_without_extension = os.path.splitext(base_name)[0]
    export_folder_path = os.path.join(processed_path, f'{name_without_extension}')

    print(f"Creating job... -> {export_folder_path}")

    os.makedirs(export_folder_path, exist_ok=True)
    os.makedirs(os.path.join(export_folder_path, 'original'), exist_ok=True)

    return export_folder_path

if __name__ == '__main__':
    create_folder(1)