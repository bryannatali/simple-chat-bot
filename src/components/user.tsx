"use client"

import { useRef } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { GitHubUser } from "@/entities/github-user"

type UserProps = {
  onEnter: (user: GitHubUser) => void
}

export function User({ onEnter }: UserProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEnter = async () => {
    if (!inputRef.current?.value) {
      return
    }

    const username = inputRef.current.value

    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json() as GitHubUser

    onEnter(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Profile</CardTitle>
        <CardDescription>We're gonna use this to improve your experience on the app</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center gap-2">
        <Input ref={inputRef} placeholder="Enter your github username" />

        <Button type="button" onClick={handleEnter}>
          Enter
        </Button>
      </CardContent>
    </Card>
  )
}