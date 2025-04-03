from rest_framework import viewsets, permissions
from .models import Item, CheckIn
from .serializers import ItemSerializer, CheckInSerializer
from rest_framework.permissions import IsAuthenticated

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CheckInViewSet(viewsets.ModelViewSet):
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer