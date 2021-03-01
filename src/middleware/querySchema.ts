export default {
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "cuisine": { "type": "string" },
    "customerRating": { "type": "string", "enum": ["1", "2", "3", "4", "5"] },
    "distance": { "type": "string", "pattern": "^\\d+$" },
    "price": { "type": "string", "pattern": "^\\d+(\\.\\d+)?$" }
  },
  "additionalProperties": false
}