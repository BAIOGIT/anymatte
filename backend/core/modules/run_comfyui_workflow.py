import sys
import json
import requests
import os

url = "http://127.0.0.1:8188"

def queue_workflow(url, workflow, export_path):
    # Load workflow into comfyui
    p = {"prompt": workflow}
    data = json.dumps(p).encode("utf-8")
    print(data)
    response = requests.post(url=f"{url}/prompt", data=data)
    if response.status_code == 200:
        # job_id = response.json().get("job_id")
        with open(f"{export_path}/job_id.json", "w") as f:
            json.dump(response.json(), f)
            # print(f"Job submitted successfully. Job ID: {job_id}")
            # return job_id  # Assuming job_id is returned in the response
    else:
        raise Exception(f"Failed to submit job: {response.text}")

# if __name__ == '__main__':
    # processed_path = '/home/swell/git/msaas/anymatte/backend/anymatte/media/processed'

    # # Load workflow api json file
    # workflow = json.load(open(sys.argv[2]))

    # # Define nodes
    # load_video_path_node = workflow["16"]
    # export_video_path_node = workflow["15"]
    # # Set nodes parameters

    # load_video_path_node["inputs"]["video"] = sys.argv[1]
    # load_video_path_node["inputs"]["frame_load_cap"] = 5

    # export_video_path_node["inputs"]["output_folder"] = processed_path
    # export_video_path_node["inputs"]["frame_rate"] = 30

    # base_name = os.path.basename(sys.argv[1])
    # name_without_extension = os.path.splitext(base_name)[0]
    # export_video_path_node["inputs"]["filename_prefix"] = name_without_extension

    # # Queue workflow into comfyui (already running)
    # queue_workflow(url, workflow)

