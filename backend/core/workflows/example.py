import configparser
import json
from urllib import request, parse
import requests
import random

mainconfig = configparser.ConfigParser()
mainconfig.read("apps/configs/mainconfig.ini")
workflow = mainconfig["comfyui"]["workflow"]
url = "http://" + mainconfig["vastai"]["ip"] + ":" + mainconfig["vastai"]["port"]
url = "http://127.0.0.1:8188"

prompt = '"0" : "A full moon night in an ancient forest, a mysterious monolith stands", "39" : "The young people of the village", "79" : "the monolith remains silent", "119": "monolith still standing, its secrets untouched", '

prompt_neg = "text, ngtvH, ngtv, ngtvB, naked, nsfw, Deformed, MultipleEyes, AdditionalFingersnnasymetrical), | (poor colors:1.2), unrealistic, (low quality, worst quality:1.2), | EasynegativeV2 bad-hands-5, humanoid, human, boy, girl, male, female, leg, arm, feet, foot, double, duplicate, duo, bad-picture-chill-75v easynegative ng_deepnegative_v1_75t bad-hands-5 no eyes, bad eyes, (worst quality, low quality:1.4), (bad_prompt_version2:0.8), EasyNegative, badhandv4, text, name, letters, watermark, (worst quality, low quality, normal quality), easynegative, FastNegativeV2, nsfw, blurry, poorly drawn, ugly, deformed, fused, hazy, ng_deepnegative_v1_75t, white borders, frame, multiple heads"


def queue_workflow(url, workflow):
    p = {"prompt": workflow}
    data = json.dumps(p).encode("utf-8")
    print(data)
    r = requests.post(url=f"{url}/prompt", data=data)
    return


def generate_animatediff(url, workflow, prompt, prompt_neg):
    workflow = json.load(open(workflow))

    chkpoint_loader_node = workflow["22"]
    lora_loader_node = workflow["34"]
    empty_latent_img_node = workflow["9"]
    ksampler_node = workflow["7"]
    prompt_pos_node = workflow["52"]
    prompt_neg_node = workflow["51"]
    animatediff_node = workflow["57"]
    motionlora_loader_node1 = workflow["60"]
    motionlora_loader_node2 = workflow["61"]
    animatediff_video_node = workflow["58"]

    chkpoint_loader_node["inputs"][
        "ckpt_name"
    ] = "main\\v1-5-pruned-emaonly.safetensors"
    lora_loader_node["inputs"]["lora_name"] = "kids\\COOLKIDS_MERGE_V2.5.safetensors"

    empty_latent_img_node["inputs"]["width"] = 512
    empty_latent_img_node["inputs"]["height"] = 512
    empty_latent_img_node["inputs"]["batch_size"] = 160

    ksampler_node["inputs"]["seed"] = 39696939
    # ksampler_node["inputs"]["seed"] = random.randint(1, 18446744073709551614)
    prompt_pos_node["inputs"]["text"] = prompt
    prompt_neg_node["inputs"]["text"] = prompt_neg

    animatediff_node["inputs"]["model_name"] = "mm_sd_v15_v2.ckpt"
    motionlora_loader_node1["inputs"]["lora_name"] = "v2_lora_TiltUp.ckpt"
    motionlora_loader_node2["inputs"]["lora_name"] = "v2_lora_ZoomIn.ckpt"

    animatediff_video_node["inputs"]["filename_prefix"] = "animatediff_coolkids_v1"

    queue_workflow(url, workflow)

    return


def main():
    generate_animatediff(url, workflow, prompt, prompt_neg)
    return


if __name__ == "__main__":
    main()
