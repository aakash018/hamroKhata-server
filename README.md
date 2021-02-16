## Audit calculation algorithm
- Divide the amount by no of room-mates
- First find the name of payer audit 
- Search for paid_To name or rotate through every name in payer's audit logs
- If payer's doesn't pays fully just substract the divided amonunt to prev amount
- If he pays fully then make the amount in provider's zero and add the substracted amount to provider's payer name field
