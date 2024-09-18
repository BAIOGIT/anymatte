#!/bin/bash

# Path to Conda installation (adjust if necessary)
CONDA_PATH="/home/swell/anaconda3"  # This is an example path; adjust to your Conda installation path.

# Initialize Conda
. "$CONDA_PATH/etc/profile.d/conda.sh"

# Activate the Conda environment
conda activate /home/swell/git/msaas/anymatte/env/anymatte

# Run the Python script
python /home/swell/git/msaas/anymatte/backend/core/workflows/SAM_2_Text_simple/SAM_2_Text_simple.py "$1" "$2" "$3"
# python /home/swell/git/msaas/anymatte/backend/core/main.py "$1"
