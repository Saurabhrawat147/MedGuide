from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import SymptomSession
from .serializers import UserSerializer, SymptomSessionSerializer

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        user = User.objects.get(email=email)
        user = authenticate(username=user.username, password=password)
        if user:
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'name': user.first_name or user.username,
                    'email': user.email
                }
            })
    except User.DoesNotExist:
        pass
    
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class SymptomSessionViewSet(viewsets.ModelViewSet):
    queryset = SymptomSession.objects.all()
    serializer_class = SymptomSessionSerializer
    
    @action(detail=False, methods=['post'])
    def analyze(self, request):
        data = request.data
        symptoms = data.get('symptoms', [])
        
        # Simple analysis logic
        causes_db = {
            'Headache': ['Tension headache', 'Dehydration', 'Stress'],
            'Fever': ['Viral infection', 'Bacterial infection'],
            'Cough': ['Common cold', 'Viral infection', 'Allergies'],
        }
        
        causes = []
        for symptom in symptoms:
            if symptom in causes_db:
                causes.extend(causes_db[symptom])
        
        results = {
            'causes': list(set(causes)),
            'preventive': ['Stay hydrated', 'Rest adequately', 'Maintain hygiene'],
            'otc': ['Paracetamol', 'Ibuprofen']
        }
        
        return Response(results)
