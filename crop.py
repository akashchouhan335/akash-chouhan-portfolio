import sys
from PIL import Image

def crop_to_content(img_path, out_path):
    # Open image
    img = Image.open(img_path)
    
    # Get bounding box of non-transparent content
    # If the image has an alpha channel, use it to find the bounding box
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        bbox = alpha.getbbox()
        if bbox:
            # Crop the image to the bounding box
            img_cropped = img.crop(bbox)
            
            # Make it square by adding minimum padding if necessary, or just save
            # Browser handles non-square favicons fine but square is better
            w, h = img_cropped.size
            max_dim = max(w, h)
            
            # Create new square image with transparent background
            new_img = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
            
            # Paste the cropped image in the center
            offset = ((max_dim - w) // 2, (max_dim - h) // 2)
            new_img.paste(img_cropped, offset)
            
            new_img.save(out_path)
            print(f"Cropped successfully. Original size: {img.size}, New size: {new_img.size}")
            return
    print("Could not find transparency bounding box. Saving as is.")
    img.save(out_path)

if __name__ == '__main__':
    crop_to_content('favicon.png', 'favicon_cropped.png')
