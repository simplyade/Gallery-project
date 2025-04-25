from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from gallery.models import Image
from gallery.serializers import ImageSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR

class ImageView(APIView):
    def get(self, request):
        try:
            images = Image.objects.all()
            serializer = ImageSerializer(images, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)

class ImageUploadView(APIView):
    def post(self, request):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
class ImageDeleteView(APIView):
    def delete(self, request, pk):
        image = Image.objects.get(pk=pk)
        image.delete()
        return Response(status=204)
class ImageEditView(APIView):
    def put(self, request, pk):
        image = Image.objects.get(pk=pk)
        serializer = ImageSerializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
class ImageFilterView(APIView):
    def get(self, request):
        query_params = request.GET.dict()
        images = Image.objects.filter(**query_params)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)
class ImagePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class ImageListView(APIView):
    pagination_class = ImagePagination

    def get(self, request):
        images = Image.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(images, request)
        serializer = ImageSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)   
class ImageSearchView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        images = Image.objects.filter(title__icontains=query)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)         

