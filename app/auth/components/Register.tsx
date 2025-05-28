import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


export default function Register() {
    return (
        <Card className="mt-2">
            <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>Заполните форму регистрации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="@peduarte" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="mail">Email</Label>
                    <Input type="mail" id="mail" placeholder="name@mail.com" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Регистрация</Button>
            </CardFooter>
        </Card>
    )
}
