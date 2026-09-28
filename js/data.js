// Datos de Cali Limpia
// IMPORTANTE: Estos datos son ficticios y solo para demostración

const BARRIOS = [
    "San Antonio",
    "El Peñón",
    "Granada",
    "Versalles",
    "San Fernando",
    "El Ingenio",
    "Santa Mónica",
    "La Flora",
    "El Refugio",
    "San Nicolás",
    "Centro",
    "San Bosco",
    "San Cayetano",
    "San Rafael",
    "San Vicente",
    "Santa Rosa",
    "Santa Teresita",
    "San Judas",
    "San Pedro",
    "San Pablo",
    "San Juan",
    "San Francisco",
    "San José",
    "San Miguel",
    "San Andrés",
    "San Lucas",
    "San Mateo",
    "San Marcos",
    "San Roque",
    "San Sebastián",
    "Santa Ana",
    "Santa Bárbara",
    "Santa Catalina",
    "Santa Cruz",
    "Santa Elena",
    "Santa Fe",
    "Santa Inés",
    "Santa Isabel",
    "Santa Lucía",
    "Santa María",
    "Santa Marta",
    "Santa Rita",
    "Santa Sofía",
    "Santa Teresa",
    "Santiago",
    "Santo Domingo",
    "Santuario",
    "Sarmiento",
    "Sevilla",
    "Siloé",
    "Simón Bolívar",
    "Sucre",
    "Tequendama",
    "Torices",
    "Trinidad",
    "Unión",
    "Urbanización",
    "Villa del Mar",
    "Villa del Río",
    "Villa del Sur",
    "Villa Flor",
    "Villa Grande",
    "Villa María",
    "Villa Niza",
    "Villa del Prado",
    "Villa del Rosario",
    "Villa del Sol",
    "Villa del Valle",
    "Villa Elisa",
    "Villa Esperanza",
    "Villa Feliz",
    "Villa Florida",
    "Villa Gloria",
    "Villa Hermosa",
    "Villa Independencia",
    "Villa Jardín",
    "Villa Linda",
    "Villa Luz",
    "Villa Mercedes",
    "Villa Nueva",
    "Villa Olímpica",
    "Villa Paz",
    "Villa Primavera",
    "Villa Real",
    "Villa Rica",
    "Villa Rosa",
    "Villa San Antonio",
    "Villa San Carlos",
    "Villa San Fernando",
    "Villa San Francisco",
    "Villa San José",
    "Villa San Juan",
    "Villa San Luis",
    "Villa San Miguel",
    "Villa San Pablo",
    "Villa San Pedro",
    "Villa San Rafael",
    "Villa San Roque",
    "Villa San Sebastián",
    "Villa San Vicente",
    "Villa Santa Ana",
    "Villa Santa Bárbara",
    "Villa Santa Catalina",
    "Villa Santa Cruz",
    "Villa Santa Elena",
    "Villa Santa Fe",
    "Villa Santa Inés",
    "Villa Santa Isabel",
    "Villa Santa Lucía",
    "Villa Santa María",
    "Villa Santa Marta",
    "Villa Santa Mónica",
    "Villa Santa Rita",
    "Villa Santa Rosa",
    "Villa Santa Sofía",
    "Villa Santa Teresa",
    "Villa Santiago",
    "Villa Santo Domingo",
    "Villa Santuario",
    "Villa Sarmiento",
    "Villa Sevilla",
    "Villa Siloé",
    "Villa Simón Bolívar",
    "Villa Sucre",
    "Villa Tequendama",
    "Villa Torices",
    "Villa Trinidad",
    "Villa Unión",
    "Villa Urbanización",
    "Villa Versalles"
];

const TIPOS_RESIDUOS = [
    "Escombros de construcción",
    "Muebles viejos",
    "Electrodomésticos",
    "Restos de poda",
    "Residuos voluminosos",
    "Otros"
];

// Respuestas del chatbot por tipo de respuesta
const RESPUESTAS = {
    escombros: {
        titulo: "Escombros de construcción",
        descripcion: "Para escombros de construcción, debes contactar a empresas autorizadas de recolección.",
        recomendaciones: [
            "Verifica que la empresa tenga licencia de funcionamiento",
            "Solicita presupuesto antes del servicio",
            "Asegúrate de que los escombros sean depositados en lugares autorizados"
        ],
        advertencia: "⚠️ No encontré empresas específicas registradas para este tipo de residuo en tu barrio. Te recomiendo contactar a la administración municipal para obtener información actualizada."
    },
    muebles: {
        titulo: "Muebles viejos",
        descripcion: "Los muebles viejos pueden ser recogidos por empresas especializadas o donados si están en buen estado.",
        recomendaciones: [
            "Considera donar muebles en buen estado a organizaciones benéficas",
            "Algunas empresas ofrecen servicio de recogida a domicilio",
            "Verifica los días de recolección especial en tu barrio"
        ],
        advertencia: "⚠️ No encontré empresas específicas registradas para este tipo de residuo en tu barrio. Te recomiendo contactar a la administración municipal para obtener información actualizada."
    },
    electrodomesticos: {
        titulo: "Electrodomésticos",
        descripcion: "Los electrodomésticos requieren manejo especial por sus componentes.",
        recomendaciones: [
            "Busca puntos de recolección de residuos electrónicos",
            "Algunas tiendas ofrecen recogida al comprar equipos nuevos",
            "Nunca los deposites en la basura común"
        ],
        advertencia: "⚠️ No encontré empresas específicas registradas para este tipo de residuo en tu barrio. Te recomiendo contactar a la administración municipal para obtener información actualizada."
    },
    poda: {
        titulo: "Restos de poda",
        descripcion: "Los restos de poda son residuos verdes que pueden ser compostados.",
        recomendaciones: [
            "Verifica los días especiales de recolección de residuos verdes",
            "Considera hacer compost con los restos de poda",
            "Poda en épocas adecuadas para evitar acumulación"
        ],
        advertencia: "⚠️ No encontré empresas específicas registradas para este tipo de residuo en tu barrio. Te recomiendo contactar a la administración municipal para obtener información actualizada."
    },
    voluminosos: {
        titulo: "Residuos voluminosos",
        descripcion: "Los residuos voluminosos requieren recolección especial.",
        recomendaciones: [
            "Contacta a empresas autorizadas de recolección",
            "Solicita el servicio con anticipación",
            "Asegúrate de que el residuo esté embalado correctamente"
        ],
        advertencia: "⚠️ No encontré empresas específicas registradas para este tipo de residuo en tu barrio. Te recomiendo contactar a la administración municipal para obtener información actualizada."
    },
    otros: {
        titulo: "Otros residuos",
        descripcion: "Para otros tipos de residuos, te recomiendo contactar a la administración municipal.",
        recomendaciones: [
            "Clasifica correctamente el residuo",
            "Consulta con las autoridades locales",
            "Busca puntos de recolección especializados"
        ],
        advertencia: "⚠️ No encontré información específica para este tipo de residuo. Te recomiendo contactar a la administración municipal para obtener información actualizada."
    }
};

// Palabras clave para identificar tipos de residuos
const PALABRAS_CLAVE = {
    escombros: ["escombro", "construcción", "obra", "cemento", "ladrillo", "arena", "grava", "demolición"],
    muebles: ["mueble", "sofá", "silla", "mesa", "cama", "armario", "estantería", "colchón"],
    electrodomesticos: ["electrodoméstico", "nevera", "refrigerador", "lavadora", "televisor", "computador", "horno", "microondas"],
    poda: ["poda", "rama", "hoja", "árbol", "césped", "jardín", "verde"],
    voluminosos: ["voluminoso", "grande", "pesado", "maquinaria", "equipo"]
};
