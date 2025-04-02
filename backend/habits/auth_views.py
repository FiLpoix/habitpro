from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Registro de usuários
@api_view(['POST'])
def register_user(request):
    data = request.data
    if get_user_model().objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = get_user_model().objects.create(
        username=data['username'],
        email=data.get('email', ''),
        password=make_password(data['password'])
    )
    
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# Login de usuários
@api_view(['POST'])
def login_user(request):
    data = request.data
    user = authenticate(username=data['username'], password=data['password'])
    if user:
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)