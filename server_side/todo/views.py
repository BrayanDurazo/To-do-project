from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from todo.models import Item
from todo.serializer import ItemSerializer
from rest_framework import status

# Create your views here.


class ItemViewSet(ViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    queryset = Item.objects.all()
    serializer = ItemSerializer

    def list(self, request):
        items_list = self.serializer(self.queryset, many=True)
        return Response(items_list.data)

    def create(self, request):
        post_data = self.serializer(data=request.data)
        if post_data.is_valid():
            post_data.save()
            return Response(post_data.validated_data, status=status.HTTP_201_CREATED)
        return Response(post_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serialized_item = self.serializer(item)
        return Response(serialized_item.data)

    def update(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        updated_item = self.serializer(item, data=request.data)
        if updated_item.is_valid():
            updated_item.save()
            return Response(updated_item.data, status=status.HTTP_201_CREATED)
        return Response(updated_item.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
