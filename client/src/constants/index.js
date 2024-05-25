import { dashboard, friends, group, message, notification, story } from "../assets"

const bgColors = [
  'bg-slate-50',
  'bg-gray-50',
  'bg-zinc-50',
  'bg-neutral-50',
  'bg-stone-50',
  'bg-red-50',
  'bg-orange-50',
  'bg-amber-50',
  'bg-yellow-50',
  'bg-lime-50',
  'bg-green-50',
  'bg-emerald-50',
  'bg-teal-50',
  'bg-cyan-50',
  'bg-sky-50',
  'bg-blue-50',
  'bg-indigo-50',
  'bg-violet-50',
  'bg-purple-50',
  'bg-fuchsia-50',
  'bg-pink-50',
  'bg-rose-50',
]

const menus = [
  {
    id: 1,
    title: "Fil d'actualité",
    icon: dashboard,
    link: "feed",
  },
  {
    id: 2,
    title: "Messages",
    icon: message,
    link: "messages",
  },
  {
    id: 3,
    title: "Vidskits",
    icon: story,
    link: "videos",
  },
  {
    id: 4,
    title: "Forums",
    icon: group,
    link: "groups",
  },
  {
    id: 5,
    title: "Amis",
    icon: friends,
    link: "friends",
  },
  {
    id: 6,
    title: "Notifications",
    icon: notification,
    link: "notifications",
  },
]

const avatars = [
  "https://api.dicebear.com/8.x/shapes/svg?seed=Annie",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Trouble",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Rocky",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Snickers",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Bob",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Maggie",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Fluffy",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Bubba",
  "https://api.dicebear.com/8.x/shapes/svg?seed=George",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Chloe",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Jasper",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Bailey",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Loki",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Cuddles",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Felix",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Cali",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Bear",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Snowball",
  "https://api.dicebear.com/8.x/shapes/svg?seed=Missy",
]

export {
  bgColors,
  menus,
  avatars,
}