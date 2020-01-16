import random, string

def get_random_code(is_unique, length=10):
	while True:
		code = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=length))
		if is_unique(code):
			break

	return code