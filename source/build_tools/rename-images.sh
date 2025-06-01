#!/bin/bash

# Navigate to images directory
cd ../assets/images/

# Fix typo in room-2010-badroom.jpg
mv "room-2010-badroom.jpg" "room-2010-bedroom.jpg"

# Convert all .jpeg to .jpg for consistency
for file in *.jpeg; do
    if [ -f "$file" ]; then
        mv "$file" "${file%.jpeg}.jpg"
    fi
done

# Convert all .webp to .jpg for consistency
for file in *.webp; do
    if [ -f "$file" ]; then
        mv "$file" "${file%.webp}.jpg"
    fi
done

# Keep .png files as they are since they might need transparency

echo "Image renaming complete!" 