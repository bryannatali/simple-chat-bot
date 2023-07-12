'use client'

import { useChat } from 'ai/react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useMemo, useState } from 'react'
import { User } from './user'
import { GitHubUser } from '@/entities/github-user'

export function Chat() {
  const [user, setUser] = useState<GitHubUser | null>(null)

  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const onEnter = (user: GitHubUser) => {
    setUser(user)
  }

  const userFallback = useMemo(() => {
    if (!user || !user.name) {
      return 'US'
    }

    const splittedName = user.name.split(' ')
    const firstName = splittedName[0]

    if (splittedName.length === 0) {
      return firstName[0].toUpperCase() + firstName[1].toLowerCase()
    }

    const lastName = splittedName[splittedName.length - 1]

    return firstName[0].toUpperCase() + lastName[0].toUpperCase()
  }, [user])

  if (!user) {
    return <User onEnter={onEnter} />
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Simple ChatBot</CardTitle>
        <CardDescription>Usign Vercel SDK to create a chat bot.</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[800px] pr-4">
          {messages.map(message => (
            <div key={message.id} className="flex gap-3 text-slate-600 text-sm mb-4">
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="https://yt3.googleusercontent.com/UqT_vCkJIn1P2fH1pchr6lbe3xeEekY61h4bUpJkVuityqKOEtUYcNy3pLiJ5OKdj4uKA81FWE8=s900-c-k-c0x00ffffff-no-rj"></AvatarImage>
                </Avatar>
              )}

              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>{userFallback}</AvatarFallback>
                  <AvatarImage src={user.avatar_url}></AvatarImage>
                </Avatar>
              )}

              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">
                  {message.role === 'user' ? user.name || 'Usuário:' : 'AI:'}
                </span>
                {message.content}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full"
        >
          <Input
            placeholder="Tell me what do you want to know"
            value={input}
            onChange={handleInputChange}
          />

          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}