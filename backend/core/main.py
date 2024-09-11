# import sys
# from modules.create_folder import *
# from modules.get_metadata import *
# from modules.get_content import *

# from modules.cv2_sequence_reader import *

# from modules.export_video import *

# def main(video_path):

#     user_id = 348

#     folder_path = create_folder(video_path, user_id)

#     share_path = '/mnt/server/process'
#     video_path = os.path.join(share_path, video_path)
    
#     metadata = get_metadata(video_path, folder_path)
#     get_content(video_path, folder_path)

#     process_images_from_folder(folder_path, metadata['video_name'])

#     reassemble_video_with_audio(folder_path, metadata['video_name'])
#     print(f'Job {folder_path} done.')

#     return

# if __name__ == '__main__':
#     main(sys.argv[1])


# ## MANCA SALVARE VIDEO CON EXT ORIGINALE EG MP4>MP4