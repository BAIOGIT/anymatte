import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
import json

from modules.create_folder import *
from modules.get_metadata import *
from modules.run_comfyui_workflow import *
from modules.purge_vram import *

url = "http://127.0.0.1:8188"

def BiRefNet_Hugo_simple(video, processed_path):
    # Load workflow api json file
    workflow = '/home/swell/git/msaas/anymatte/backend/core/workflows/BiRefNet_Hugo_simple/BiRefNet_Hugo_simple-API.json'
    workflow = json.load(open(workflow))

    # Define nodes
    load_video_path_node = workflow["16"]
    export_video_path_node = workflow["15"]

    # Set nodes parameters
    load_video_path_node["inputs"]["video"] = video
    load_video_path_node["inputs"]["frame_load_cap"] = 0

    export_video_path_node["inputs"]["output_folder"] = processed_path
    export_video_path_node["inputs"]["save_incremental"] = False
    export_video_path_node["inputs"]["frame_rate"] = 30

    base_name = os.path.basename(video)
    name_without_extension = os.path.splitext(base_name)[0]
    export_video_path_node["inputs"]["filename_prefix"] = name_without_extension

    return workflow

def main(video_path):
    try:
        processed_path = '/home/swell/git/msaas/anymatte/backend/anymatte/media/processed'
        folder_path = create_folder(video_path, processed_path)
        metadata = get_metadata(video_path, folder_path)
        
        workflow = BiRefNet_Hugo_simple(video_path, folder_path)

        queue_workflow(url, workflow)
    except Exception as e:
        print(f'Workflow error: {e}')
    
    clear_memory(url)

    return

if __name__ == '__main__':
    main(sys.argv[1])