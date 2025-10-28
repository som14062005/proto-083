import time
import os

SENDER_FILE = "Sender_Buffer.txt"
RECEIVER_FILE = "Receiver_Buffer.txt"

def read_from_sender():
    if not os.path.exists(SENDER_FILE):
        return []
    with open(SENDER_FILE, "r") as f:
        lines = f.readlines()
        frames = []
        for line in lines:
            parts = line.strip().split(",")
            if len(parts) == 2:
                frames.append({"no": int(parts[0]), "data": parts[1]})
        return frames

def write_ack(msg):
    with open(RECEIVER_FILE, "w") as f:
        f.write(msg)
    print(f"[Receiver] Wrote '{msg}' to Receiver_Buffer.txt")

def receiver():
    expected_no = 0

    while True:
        frames = read_from_sender()
        if not frames:
            time.sleep(1)
            continue

        print("\n[Receiver] Received Frames:")
        for frame in frames:
            print(f"Frame No: {frame['no']}, Data: {frame['data']}")

        # Check for expected frame sequence
        error_found = False
        for frame in frames:
            if frame["no"] != expected_no:
                print(f"[Receiver] ERROR! Expected Frame {expected_no} but got {frame['no']}")
                write_ack(f"NACK {expected_no}")
                error_found = True
                break
            expected_no += 1

        if not error_found:
            ack_no = frames[-1]["no"]
            write_ack(f"ACK {ack_no}")

        time.sleep(3)

if __name__ == "__main__":
    receiver()
