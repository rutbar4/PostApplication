export const formatAuthorName = (name) => {
	return name
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const getCurrentDate = () => {
	return new Date()
		.toLocaleDateString('ko-KR')
		.replaceAll('. ', '-')
		.replaceAll('.', '');
};
