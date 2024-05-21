import { dashboard, friends, group, notification, post, story } from "../assets"

const bgColors = [
  'bg-slate-100',
  'bg-gray-100',
  'bg-zinc-100',
  'bg-neutral-100',
  'bg-stone-100',
  'bg-red-100',
  'bg-orange-100',
  'bg-amber-100',
  'bg-yellow-100',
  'bg-lime-100',
  'bg-green-100',
  'bg-emerald-100',
  'bg-teal-100',
  'bg-cyan-100',
  'bg-sky-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-violet-100',
  'bg-purple-100',
  'bg-fuchsia-100',
  'bg-pink-100',
  'bg-rose-100',
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
    title: "Mes publications",
    icon: post,
    link: "posts",
  },
  {
    id: 3,
    title: "Mes stories",
    icon: story,
    link: "stories",
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

export {
  bgColors,
  menus,
}