import postImgOne from "../assets/images/postImg1.jpg";
import postImgTwo from "../assets/images/postImg2.jpg";
import postImgThree from "../assets/images/postImg3.jpg";
import avatarMe from "../assets/images/small_avata_me.png";
import avatarUser from "../assets/images/small_avatar_user.png";

export const postData = [
  {
    postId: 1,
    postImage: postImgOne,
    postTitle: "Ліс",
    postLikes: 152,
    postComments: 8,
    location: {
      locationName: "Харьков, Харьковская область, Украина",
      coords: {
        latitude: 49.99309385513399,
        longitude: 36.23568880805463,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    },
    comments: [
      {
        id: "gtrtgh4",
        userId: "u1",
        avatar: avatarUser,
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        commentId: "cm1",
        date: "09 червня, 2020 | 08:40",
      },
      {
        id: "t5454yt",
        userId: "u2",
        avatar: avatarMe,
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        commentId: "cm2",
        date: "09 червня, 2020 | 09:14",
      },
      {
        id: "tdfgd34t",
        userId: "u1",
        avatar: avatarUser,
        comment: "Thank you! That was very helpful!",
        commentId: "cm3",
        data: "09 червня, 2020 | 09:20",
      },
      {
        id: "ret435tg",
        userId: "u1",
        avatar: avatarUser,
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        commentId: "cm4",
        date: "09 червня, 2020 | 08:40",
      },
      {
        id: "45hgnhmd",
        avatar: avatarMe,
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        commentId: "cm5",
        date: "09 червня, 2020 | 09:14",
      },
      {
        id: "ert546kmbv",
        userId: "u1",
        avatar: avatarUser,
        comment: "Thank you! That was very helpful!",
        commentId: "cm6",
        data: "09 червня, 2020 | 09:20",
      },
    ],
  },
  {
    postId: 2,
    postImage: postImgTwo,
    postTitle: "Захід на Чорному морі",
    postLikes: 200,
    location: {
      locationName: "Хайфа, Израиль",
      coords: {
        latitude: 32.79369893974901,
        longitude: 34.98862187518772,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    },
  },
  {
    postId: 3,
    postImage: postImgThree,
    postTitle: "Старий будиночок у Венеції",
    postLikes: 200,
    location: {
      locationName: "Тель-Авив, Израиль",
      coords: {
        latitude: 32.085594705636694,
        longitude: 34.78419842098831,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    },
  },
];
