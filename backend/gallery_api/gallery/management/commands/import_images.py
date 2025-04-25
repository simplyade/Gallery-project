from django.core.management.base import BaseCommand
from django.core.files import File
from gallery.models import Image
import os

class Command(BaseCommand):
    help = 'Import images from a directory'

    def handle(self, *args, **options):
        directory = '/path/to/images'
        for filename in os.listdir(directory):
            if filename.endswith(".jpg") or filename.endswith(".png"):
                filepath = os.path.join(directory, filename)
                with open(filepath, 'rb') as file:
                    image = Image(title=filename, image=File(file))
                    image.save()
                    self.stdout.write(self.style.SUCCESS(f'Imported {filename}'))
