import React, { useEffect, useState, useMemo } from "react"
import Echo from "laravel-echo"
import Pusher from "pusher-js"

/**
 * Pusher configuration
 */
const pusherConfig = {
    broadcaster: 'pusher',
    key: 'myappkey',
    //cluster: 'mt1',
    forceTLS: false,
    //encrypted: false,

    //authEndpoint is your apiUrl + /broadcasting/auth
    //authEndpoint: config.pusher.authEndpoint, 
    wsHost: window.location.hostname,

    // As I'm using JWT tokens, I need to manually set up the headers.
    wsPort: 6001,
    disableStats:true,
}


/**
 * Context for Channels
 */
type TChannels = Echo | undefined
const ChannelsContext = React.createContext<TChannels>(undefined)

/**
 * Channel Context Provider
 */

/**
 * Hook to use the channels provided via context
 */
export function useChannels() {
  const channels = React.useContext(ChannelsContext)
  return channels
}

/**
 * Use private channels
 * It simple return the useChannels with authenticated user bindings
 */ 
    
/**
 * Get the channels
 */
function getChannels(pusherConfig:any, authToken?: string) {
  const client = new Pusher(pusherConfig.key, {
    cluster: pusherConfig.cluster,
    forceTLS: true,
    authEndpoint: pusherConfig.authEndpoint,
    auth: authToken ? {
      headers: {
        // pass the authorization token when using private channels
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }: undefined,
  })

  const channels = new Echo({
    broadcaster: "pusher",
    client: client,
  })
  return channels
}
