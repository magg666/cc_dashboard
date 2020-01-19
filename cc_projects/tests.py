from django.test import TestCase
from unittest import TestCase as UniTestCase
from cc_projects.validators import is_valid_format, is_valid_url, is_valid_plan, is_valid_module_id


class ValidatorTest(UniTestCase):

    def test_format_valid(self):
        valid_data = {'url': "https://github.com/owner/project",
                      'plan': 'http://plan',
                      'module': 5}
        self.assertTrue(is_valid_format(valid_data))

    def test_format_invalid(self):
        invalid_data = {'wrong_key': "https://github.com/owner/project",
                        'plan': 'http://plan',
                        'module': 5}
        self.assertFalse(is_valid_format(invalid_data))

    def test_url_valid_correct(self):
        valid_data1 = {'url': "https://github.com/owner/project"}
        valid_data2 = {'url': "https://github.com/owner/project/other_things"}

        self.assertTrue(is_valid_url(valid_data1))
        self.assertTrue(is_valid_url(valid_data2))

    def test_url_incorrect_data(self):
        invalid1 = {'url': "http://github.com/owner/project"}
        invalid2 = {'url': "https://google.com/owner/project"}
        invalid3 = {'url': "https://github.com/owner"}

        self.assertFalse(is_valid_url(invalid1))
        self.assertFalse(is_valid_url(invalid2))
        self.assertFalse(is_valid_url(invalid3))

    def test_url_incorrect_format(self):
        invalid1 = {'url': ""}
        invalid2 = {'url': "github.com-project-owner"}

        self.assertRaises(IndexError, is_valid_url, invalid1)
        self.assertRaises(IndexError, is_valid_url, invalid2)

    def test_plan_correct(self):
        valid = {"plan": "http://plan/link"}

        self.assertTrue(is_valid_plan(valid))

    def test_plan_incorrect(self):
        invalid1 = {"plan": "link_to_project"}
        invalid2 = {"plan": ""}

        self.assertRaises(IndexError, is_valid_plan, invalid1)
        self.assertRaises(IndexError, is_valid_plan, invalid2)

    def test_module_correct(self):
        valid = {"module": 3}

        self.assertTrue(is_valid_module_id(valid))

    def test_module_incorrect(self):
        invalid1 = {"module": "5"}
        invalid2 = {"module": ""}

        self.assertFalse(is_valid_module_id(invalid1))
        self.assertFalse(is_valid_module_id(invalid2))
