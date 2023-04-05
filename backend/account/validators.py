import os

def validate_file_extension(name):
    isvalid = True

    ext = os.path.splitext(name)[1] # ('image', '.jpg')
    validate_extension = ['.pdf']

    if not ext.lower() in validate_extension:
        isvalid = False

        return isvalid