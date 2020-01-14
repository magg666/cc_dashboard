from rest_framework import viewsets, status
from datetime import date

from rest_framework.response import Response

from cc_github.utils import get_current_repositories
from cc_projects.serializers import RepositorySerializer
from cc_github.models import Repository, Module
from cc_projects.validators import is_valid


class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = get_current_repositories()
    serializer_class = RepositorySerializer
    http_method_names = ['get', 'post']

    def create(self, request, *args, **kwargs):
        module_name = request.data.get('module')
        module = Module.objects.get(module=module_name)
        request.data['module'] = module.id
        try:
            if is_valid(request.data):
                project, created = Repository.objects.update_or_create(url=request.data['url'],
                                                                       defaults={
                                                                           'date': date.today,
                                                                           'plan': request.data['plan'],
                                                                           'module_id': request.data['module']
                                                                       })
                if created:
                    return Response(request.data, status.HTTP_201_CREATED)
                else:
                    return Response(request.data, status.HTTP_200_OK)
        except IndexError as e:
            return Response(request.data, status.HTTP_206_PARTIAL_CONTENT)

        return Response(request.data, status.HTTP_406_NOT_ACCEPTABLE)
