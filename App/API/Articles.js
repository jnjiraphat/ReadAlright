const articles = async (id) => {
    const response = await fetch(`http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/reading`);
    const data = await response.json()
    return data;
}

export default articles

