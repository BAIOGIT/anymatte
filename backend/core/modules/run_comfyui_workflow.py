import sys
import json
import requests
import os

url = "http://127.0.0.1:8188"

def queue_workflow(url, workflow):
    # Load workflow into comfyui
    p = {"prompt": workflow}
    data = json.dumps(p).encode("utf-8")
    print(data)
    r = requests.post(url=f"{url}/prompt", data=data)
    return

if __name__ == '__main__':
    processed_path = '/home/swell/git/msaas/anymatte/backend/anymatte/media/processed'

    # Load workflow api json file
    workflow = json.load(open(sys.argv[2]))

    # Define nodes
    load_video_path_node = workflow["16"]
    export_video_path_node = workflow["15"]
    # Set nodes parameters

    load_video_path_node["inputs"]["video"] = sys.argv[1]
    load_video_path_node["inputs"]["frame_load_cap"] = 5

    export_video_path_node["inputs"]["output_folder"] = processed_path
    export_video_path_node["inputs"]["frame_rate"] = 30

    base_name = os.path.basename(sys.argv[1])
    name_without_extension = os.path.splitext(base_name)[0]
    export_video_path_node["inputs"]["filename_prefix"] = name_without_extension

    # Queue workflow into comfyui (already running)
    queue_workflow(url, workflow)