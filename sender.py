import time
import os

SENDER_FILE = "Sender_Buffer.txt"
RECEIVER_FILE = "Receiver_Buffer.txt"

def write_to_file(frames):
    with open(SENDER_FILE, "w") as f:
        for frame in frames:
            f.write(f"{frame['no']},{frame['data']}\n")
    print("\n[Sender] Frames written to Sender_Buffer.txt")

def read_ack():
    if not os.path.exists(RECEIVER_FILE):
        return None
    with open(RECEIVER_FILE, "r") as f:
        return f.read().strip()

def sender():
    window_size = int(input("Enter Window Size: "))
    message = input("Enter your message: ")

    frames = [{"no": i, "data": ch} for i, ch in enumerate(message)]

    print("\n[Sender] Message broken into frames:")
    for f in frames:
        print(f"Frame {f['no']} : {f['data']}")

    base = 0
    while base < len(frames):
        window = frames[base:base+window_size]
        print(f"\n[Sender] Sending frames {base} to {base+len(window)-1}")
        write_to_file(window)

        print("[Sender] Waiting for Acknowledgement...")
        time.sleep(3)  # simulate network delay

        ack = read_ack()
        if ack is None:
            print("[Sender] No ACK received! Resending same window...")
            continue

        if ack.startswith("ACK"):
            ack_no = int(ack.split()[1])
            print(f"[Sender] Received {ack}")
            base = ack_no + 1  # Move window
        elif ack.startswith("NACK"):
            nack_no = int(ack.split()[1])
            print(f"[Sender] Received {ack}, Resending from Frame {nack_no}")
            base = nack_no
        else:
            print("[Sender] Invalid ACK/NACK received! Ignoring...")

    print("\n[Sender] All frames sent successfully ✅")

if __name__ == "__main__":
    sender()
