const baseProfessors = [
{
    id: '1',
    name: 'Charnchai Pluempitiwiriyawej',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: 'https://ee.eng.chula.ac.th/wp-content/uploads/2021/01/Charnchai.png',
    courses: ['Probability and Statistics for Data Analysis', 'Advanced Mathematics Methods', 'Signals and Linear Systems'],
},
{
    id: '2',
    name: 'David Banjerdpongchai',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: 'https://ee.eng.chula.ac.th/wp-content/uploads/2021/02/72-1024x1536.jpg',
    courses: ['Advanced Mathematics Methods'],
},
{
    id: '3',
    name: 'Peerapon Vateekul',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2022/05/IMG_1112-420x600.jpg',
    courses: ['Computer Programming', 'Data Science']
},
{
    id: '4',
    name: 'Vishnu Kotrajaras',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'http://mis.cp.eng.chula.ac.th/view.php?q=instructor/picture&key=10002101',
    courses: ['Computer Programming', 'Fundamental Data Structure and Algorithm']
},
{
    id: '5',
    name: 'Chonlatep Usaku',
    department: 'Chemical Engineering',
    avgRating: 0,
    image: 'https://chem.eng.chula.ac.th/wp-content/uploads/2024/01/Achonlatep.jpg',
    courses: ['Exploring Engineering World']
},
{
    id: '6',
    name: 'Sindhu Achuthankutty',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Dr._Sindhu_375_500.jpg',
    courses: ['Computer Programming', 'Introduction to ICE']
},
{
    id: '7',
    name: 'Sirin Nitinawarat',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Sirin_Nitinawarat_Ph.D._375_500.jpg',
    courses: ['Introduction to ICE']
},
{
    id: '8',
    name: 'Sukree Sinthupinyo',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2017/01/sukree.jpg',
    courses: ['Advanced Computer Programming', 'Application Development']
},
{
    id: '9',
    name: 'Yan Zhao',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Assoc._Prof._Yan_Zhao_Ph.D._375_500.jpg',
    courses: ['Electrical Circuit for ICE']
},
{
    id: '10',
    name: 'Chanchana Tangwongsan',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: 'https://ee.eng.chula.ac.th/wp-content/uploads/2021/02/Chanchana-1024x1536.jpg',
    courses: ['Fundamental of Circuit and Digital Electronics Laboratory']
},
{
    id: '11',
    name: 'Kumbesan Sandrasegaran',
    department: 'ISE',
    avgRating: 0,
    image: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=BWm25YoAAAAJ&citpid=3',
    courses: ['Fundamental of Circuit and Digital Electronics Laboratory', 'Signals and Linear Systems']
},
{
    id: '12',
    name: 'Kunwadee Sripanidkulchai',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'http://mis.cp.eng.chula.ac.th/view.php?q=instructor/picture&key=10020375',
    courses: ['Discrete Structure']
},
{
    id: '13',
    name: 'Hossein Miri',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Hossein_Miri_Ph.D__375_500.png',
    courses: ['Fundamental Data Structure and Algorithm', 'Artificial Intelligence']
},
{
    id: '14',
    name: 'Machigar Ongtang',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2024/06/05_0-420x600.png',
    courses: ['Application Development']
},
{
    id: '15',
    name: 'Ekapol Chuangsuwanich',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=ST-jPeYAAAAJ&citpid=2',
    courses: ['Artificial Intelligence']
},
{
    id: '16',
    name: 'Wasamon Jantai',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2023/07/Wasamon-640x640-1.jpg',
    courses: ['Calculus I', 'Calculus II']
},
{
    id: '17',
    name: 'Wutichai Chongchitmate',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/wutichai-5.jpg',
    courses: ['Calculus I']
},
{
    id: '18',
    name: 'Tuangrat Chaichana',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/tuangrat_640x640-1-5.jpg',
    courses: ['Calculus I', 'Calculus II']
},
{
    id: '19',
    name: 'Sujin Khomrutai',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Sujin-Khomrutai-1-5.jpg',
    courses: ['Calculus I']
},
{
    id: '20',
    name: 'Pongdate Montagantirud',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Pongdate1.jpg',
    courses: ['Calculus I', 'Calculus II']
},
{
    id: '21',
    name: 'Phantipa Thipwiwatpotjana',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Phantipa-Thipwiwatpotjana-1-5.jpg',
    courses: ['Calculus I', 'Calculus II']
},
{
    id: '22',
    name: 'Chotiros Surapholchai',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Chotiros-Surapholchai-1-5.jpg',
    courses: ['Calculus II']
},
{
    id: '23',
    name: 'Krung Sinapiromsaran',
    department: 'Mathematics and Computer Science',
    avgRating: 0,
    image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Krung-Sinapiromsaran-1-5.jpg',
    courses: ['Calculus II']
},
{
    id: '24',
    name: 'Chate Patanothai',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2017/01/405-420x600.jpg',
    courses: ['Computer Programming']
},
{
    id: '25',
    name: 'Duangdao Wichadakul',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://mis.cp.eng.chula.ac.th/view.php?q=instructor/picture&key=10019318',
    courses: ['Computer Programming']
}
];

export default baseProfessors;