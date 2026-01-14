import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

const ChildComponent = ({title}) => {
    return (
        <View>
            <Button style={{marginVertical:10}} mode="contained" onPress={() => auth?.logout()}>{title}</Button>
        </View>
    )
}

export default ChildComponent

