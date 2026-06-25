# Security Specification

## Data Invariants
1. The `editorials` document must have all required fields present.
2. Any write to `editorials` must contain valid string fields.
3. String sizes for base64 images can be large, up to 1.5MB to support custom images.

## Dirty Dozen Payloads
- Payload 1: Missing `heroBg` key on create
- Payload 2: Empty fields
- Payload 3: Invalid type for `heroTitle` (number instead of string)

## Test Configurations
- Public reads and writes are allowed since we don't have user accounts, but with strict schema check.
