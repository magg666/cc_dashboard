from rest_framework import serializers

from cc_github.models import Repository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ["url", "plan", "owner", "project", "module"]

    def to_representation(self, instance):
        rep = super(RepositorySerializer, self).to_representation(instance)
        rep['module'] = instance.module.get_module_display()
        return rep

