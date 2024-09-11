import ffmpeg
import json
import os
from datetime import datetime

def get_metadata(video_file, metadata_folder):
    try:
        # Step 1: Analyze video format using FFprobe
        print(f"Storing metadata...")

        probe = ffmpeg.probe(video_file)
        
        base_name = os.path.basename(video_file)
        name_without_extension = os.path.splitext(base_name)[0]

        video_stream = next((stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
        audio_stream = next((stream for stream in probe['streams'] if stream['codec_type'] == 'audio'), None)

        # print(video_stream)
        # print(audio_stream)

        # Prepare data to save as JSON
        metadata = {
            "video_name": name_without_extension,
            "video_codec": video_stream['codec_name'],
            # "video_codec_long_name": video_stream['codec_long_name'],
            # "video_codec_type": video_stream['codec_type'],
            # "video_codec_tag_string": video_stream['codec_tag_string'],
            # "video_codec_tag": video_stream['codec_tag'],
            # "video_profile": video_stream['profile'],
            # "video_pix_fmt": video_stream['pix_fmt'],
            "video_framerate": eval(video_stream['r_frame_rate']),
            "video_width": video_stream['width'],
            "video_height": video_stream['height'],
            "audio_codec": audio_stream['codec_name'] if audio_stream else None,
            "audio_channels": audio_stream['channels'] if audio_stream else None,
            "audio_sample_rate": audio_stream['sample_rate'] if audio_stream else None
        }

        # Step 2: Save the video properties as a JSON file
        # Create the processed directory if it doesn't exist
        filename = f'{metadata_folder}/metadata.json'

        # Save the JSON file
        with open(filename, 'w') as json_file:
            json.dump(metadata, json_file, indent=4)

        # print(f"Stored video properties. -> {filename}")

        return metadata
    except Exception as e:
        print(e)

if __name__ == '__main__':
    get_metadata('/home/swell/Scaricati/IMG_9452.mov', './processed')