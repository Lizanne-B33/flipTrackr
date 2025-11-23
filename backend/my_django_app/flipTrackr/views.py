from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


@api_view(['GET'])
# test React and Django set up
def hello_world(request):
    return Response({"message": "Hello from Django!"})

# https://medium.com/@ronakchitlangya1997/jwt-authentication-with-react-js-and-django-c034aae1e60d


class HomeView(APIView):
    # Test JWT Authorization token
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {"message": "Welcome to the FlipTrackr project using React Js and Django!"
                   }
        return Response(content)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
