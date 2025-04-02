from rest_framework import viewsets, permissions
from .models import Item
from .serializers import ItemSerializer
from rest_framework.permissions import IsAuthenticated

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user)  # 🔹 Filtra apenas os hábitos do usuário logado

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
