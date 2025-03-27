# views.py
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Habit, CheckIn
from .serializers import HabitSerializer, CheckInSerializer
from django.contrib.auth import authenticate, login
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login realizado com sucesso!'})
            else:
                return JsonResponse({'error': 'Credenciais inválidas'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de dados inválido'}, status=400)
    return JsonResponse({'error': 'Método não permitido'}, status=405)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')

            if not username or not password or not email:
                return JsonResponse({'error': 'Todos os campos são obrigatórios'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Usuário já existe'}, status=400)

            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()

            return JsonResponse({'message': 'Usuário registrado com sucesso!'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de dados inválido'}, status=400)
    return JsonResponse({'error': 'Método não permitido'}, status=405)
class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class CheckInViewSet(viewsets.ModelViewSet):
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer


def habit_list(request):
    habits = Habit.objects.all()
    data = serialize('json', habits)
    return JsonResponse(data, safe=False)
