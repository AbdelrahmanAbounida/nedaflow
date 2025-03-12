from enum import Enum



class FieldTypes(str,Enum):
    TEXT = "TEXT"
    BOOLEAN="BOOLEAN"
    NUMBER="NUMBER"
    JSON="JSON"
    FILE="FILE"
    DATA="DATA"
    DROPDOWN="DROPDOWN"
    LIST_STRING="LIST_STRING"
    LIST_NUMBER="LIST_NUMBER"
