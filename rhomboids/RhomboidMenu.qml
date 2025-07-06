import QtQuick

Rectangle {
    id: root

    property int tileSize: height
    property int overlapAmount: 10
    property int numberOfTiles: 8
    // rhomboid inset and margins
    property real shearFactor: -0.1
    property real rhomboidInset: Math.abs(tileSize * shearFactor)
    property int edgeOffset: tileSize - rhomboidInset

    anchors {
        fill: parent
    }
    color: "#545559"

    Flickable {
        id: flickableArea

        anchors {
            fill: parent
        }
        contentWidth: 2 * edgeOffset + tileContainer.width
        contentHeight: tileContainer.height
        clip: true

        flickableDirection: Flickable.HorizontalFlick
        boundsMovement : Flickable.StopAtBounds

        Item {
            id: menuStart
            z: 5
            anchors {
                top: parent.top
                left: parent.left
            }
            height: parent.height
            width: height

            Text {
                anchors {
                    centerIn: parent
                }
                text: "Start menu"
                color: "white"
            }
        }

        Row {
            id: tileContainer
            spacing: -root.overlapAmount

            z: 10
            anchors {
                left: parent.left
                verticalCenter: parent.verticalCenter
                leftMargin: edgeOffset
                rightMargin: edgeOffset
            }

            Repeater {
                model: root.numberOfTiles

                MenuItem {
                    height: root.tileSize
                    width: height
                }
            }
        } // Row

        Item {
            id: menuEnd
            z: 5
            anchors {
                top: parent.top
                right: parent.right
            }
            height: parent.height
            width: height

            Text {
                anchors {
                    centerIn: parent
                }
                text: "End menu"
                color: "white"
            }
        }

    } // Flickable

} // root
