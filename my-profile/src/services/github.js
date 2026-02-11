import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
})

export const getRepos = (username) =>
  api.get(`/users/${username}/repos`)

export const getRepoLanguages = (url) =>
  api.get(url)
