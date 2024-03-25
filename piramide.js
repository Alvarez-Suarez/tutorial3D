function crearPiramide(radio,altura,lados){
    const geometry = new THREE.ConeGeometry(radio,altura,lados);
    const material = new THREE.MeshBasicMaterial({color:blue});
    return new THREE.Mesh(geometry,material);
}
