from marshmallow import Schema, fields


class SourceSchema(Schema):
    label = fields.String()
    url = fields.URL()
