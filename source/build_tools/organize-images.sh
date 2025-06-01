#!/bin/bash

# Navigate to images directory
cd ../assets/images/

# Create directories
mkdir -p rooms views amenities food icons

# Move room images
mv room-2010.jpg room-2010-bedroom.jpg beach-tower-room.jpg beach-tower-room2.jpg rooms/

# Move view images
mv view.jpg view-two.jpg balcony.jpg views/

# Move amenity images
mv bath.jpg kitchen.jpg reception.jpg stake.jpg amenities/

# Move food images
mv burger.jpg dessert.jpg food/

# Move icon images
mv sun.png sunset.png icons/

# Move sight images to views (since they appear to be views/sights)
mv sight-*.jpg views/

# Move hotel image to root (as it might be a general image)
# hotel.jpg stays in root

echo "Image organization complete!"
echo "Directory structure:"
tree 