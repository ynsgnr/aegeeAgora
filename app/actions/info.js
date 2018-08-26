
//This file is about info branch for databaase operations

//Always return a promise and always resolve with an array

export function getAllInfo(){
  return new Promise(function(resolve,reject){
    //Get object here
    resolve(
      [
        {
          //Return Object here
          eventKey: '',
          locationKey: '',
          key: '0', //switch to string
          type: 'contact',
          title: 'Name Surname',
          image: 'https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png',
          text: 'Duty',
          link: '05555555555',//Add to phone as a person
        },
        {
          eventKey: '',
          locationKey: '',
          key: '01', //switch to string
          type: 'contact',
          title: 'Name Surname',
          image: 'https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png',
          text: 'Duty',
          link: '05555555555',//Add to phone as a person
        },
        {
          eventKey: '',
          locationKey: '',
          key: '10', //switch to string
          type: 'download',
          title: 'Document name',
          image: 'https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_17-512.png',
          text: 'Document explanation',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '',
          locationKey: '',
          key: '11', //switch to string
          type: 'download',
          title: 'Document name',
          image: 'https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_17-512.png',
          text: 'Document explanation',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '',
          locationKey: '',
          key: '12', //switch to string
          type: 'download',
          title: 'Document name',
          image: 'https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_17-512.png',
          text: 'Document explanation',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '',
          locationKey: '',
          key: '2', //switch to string
          type: 'bonus',
          title: 'Bonus info title',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: 'Info Here',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '0',
          locationKey: '0',
          key: '3', //switch to string
          type: 'news',
          title: 'News Title',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: 'News Info',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '0',
          locationKey: '0',
          key: '4', //switch to string
          type: 'news',
          title: 'News Title 2',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: 'News Info 2',
          link: 'http://aegee.org/', //open in browser
        }

      ]
    )
  })
}

export function getAllNews(){
  return new Promise(function(resolve,reject){
    //Get object here
    //Only tyoe:'news'
    resolve(
      [
        {
          eventKey: '0',
          eventInfo: 'Test Event',
          locationKey: '0',
          locationInfo:'Test Location',
          key: '1', //switch to string
          type: 'news',
          title: 'News Title 1',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: "Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. Ayrıca arama motorlarında 'lorem ipsum' anahtar sözcükleri ile arama yapıldığında henüz tasarım aşamasında olan çok sayıda site listelenir. Yıllar içinde, bazen kazara, bazen bilinçli olarak (örneğin mizah katılarak), çeşitli sürümleri geliştirilmiştir.",
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '',
          eventInfo: 'Test Event',
          locationKey: '1',
          locationInfo:'Test Location 1',
          key: '2', //switch to string
          type: 'news',
          title: 'News Title 2',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: 'News Info 2',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '0',
          eventInfo: 'Test Event',
          locationKey: '',
          locationInfo:'Test Location',
          key: '3', //switch to string
          type: 'news',
          title: 'News Title 3',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: '',
          link: 'http://aegee.org/', //open in browser
        },
        {
          eventKey: '',
          eventInfo: 'Test Event',
          locationKey: '',
          locationInfo:'Test Location',
          key: '4', //switch to string
          type: 'news',
          title: 'News Title 4',
          image: 'https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg',
          text: "Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. Ayrıca arama motorlarında 'lorem ipsum' anahtar sözcükleri ile arama yapıldığında henüz tasarım aşamasında olan çok sayıda site listelenir. Yıllar içinde, bazen kazara, bazen bilinçli olarak (örneğin mizah katılarak), çeşitli sürümleri geliştirilmiştir.",
          link: 'http://aegee.org/', //open in browser
        }
      ]
    )
  })
}
